/**
 * Atlas EV Motors – Express Backend API
 * ─────────────────────────────────────
 * Runs on http://localhost:3001
 * Data is persisted to ./db.json
 *
 * Endpoints:
 *   GET    /api/cars           – List all cars
 *   GET    /api/cars/:id       – Get single car by id
 *   POST   /api/cars           – Add a new car
 *   PUT    /api/cars/:id       – Update a car
 *   DELETE /api/cars/:id       – Delete a car
 *   POST   /api/auth/login     – Admin login
 *   POST   /api/auth/logout    – Admin logout (stateless, for completeness)
 */

const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');
const { v4: uuidv4 } = require('uuid');

const app    = express();
const PORT   = 3001;
const DB_PATH = path.join(__dirname, 'db.json');

// ── Admin credentials (change password here) ───────────────────────
const ADMIN_PASSWORD = 'atlas2024';

// ── Middleware ──────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:4173'] }));
app.use(express.json());

// ── DB helpers ──────────────────────────────────────────────────────
function readDB() {
  try {
    const raw = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to read db.json:', e.message);
    return [];
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (e) {
    console.error('Failed to write db.json:', e.message);
  }
}

function slugify(str) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ── Routes ──────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET all cars
app.get('/api/cars', (req, res) => {
  const cars = readDB();
  res.json(cars);
});

// GET single car by id
app.get('/api/cars/:id', (req, res) => {
  const cars = readDB();
  const car = cars.find(c => c.id === req.params.id || c.slug === req.params.id);
  if (!car) return res.status(404).json({ error: 'Car not found' });
  res.json(car);
});

// POST – Add new car
app.post('/api/cars', (req, res) => {
  const cars = readDB();
  const body = req.body;

  if (!body.name || !body.price) {
    return res.status(400).json({ error: 'name and price are required' });
  }

  const id   = body.id   || `car-${uuidv4().split('-')[0]}`;
  const slug = body.slug || slugify(body.name);

  // Ensure unique slug
  const slugExists = cars.some(c => c.slug === slug && c.id !== id);
  const finalSlug  = slugExists ? `${slug}-${Date.now()}` : slug;

  const newCar = {
    ...body,
    id,
    slug: finalSlug,
    price:   Number(body.price),
    range:   Number(body.range   || 0),
    battery: Number(body.battery || 0),
    seats:   Number(body.seats   || 5),
    mileage: Number(body.mileage || 0),
    year:    Number(body.year    || new Date().getFullYear()),
    images:  body.images?.length ? body.images : ['/car-model3.png'],
    features: Array.isArray(body.features) ? body.features : [],
    specs:   body.specs || {},
    featured: Boolean(body.featured),
    createdAt: new Date().toISOString().split('T')[0],
  };

  cars.unshift(newCar);
  writeDB(cars);
  res.status(201).json(newCar);
});

// PUT – Update car
app.put('/api/cars/:id', (req, res) => {
  const cars  = readDB();
  const index = cars.findIndex(c => c.id === req.params.id);

  if (index === -1) return res.status(404).json({ error: 'Car not found' });

  const body = req.body;
  const updated = {
    ...cars[index],
    ...body,
    id: req.params.id, // id cannot be changed
    price:   body.price   !== undefined ? Number(body.price)   : cars[index].price,
    range:   body.range   !== undefined ? Number(body.range)   : cars[index].range,
    battery: body.battery !== undefined ? Number(body.battery) : cars[index].battery,
    seats:   body.seats   !== undefined ? Number(body.seats)   : cars[index].seats,
    mileage: body.mileage !== undefined ? Number(body.mileage) : cars[index].mileage,
    year:    body.year    !== undefined ? Number(body.year)    : cars[index].year,
  };

  cars[index] = updated;
  writeDB(cars);
  res.json(updated);
});

// DELETE – Remove car
app.delete('/api/cars/:id', (req, res) => {
  const cars    = readDB();
  const initial = cars.length;
  const filtered = cars.filter(c => c.id !== req.params.id);

  if (filtered.length === initial) {
    return res.status(404).json({ error: 'Car not found' });
  }

  writeDB(filtered);
  res.json({ success: true, id: req.params.id });
});

// POST – Admin login (stateless: just validates password, client stores session)
app.post('/api/auth/login', (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ error: 'Password is required' });

  if (password === ADMIN_PASSWORD) {
    res.json({ success: true, token: 'atlas-admin-session' });
  } else {
    res.status(401).json({ success: false, error: 'Incorrect password' });
  }
});

// POST – Admin logout (client-side only, but provided for completeness)
app.post('/api/auth/logout', (req, res) => {
  res.json({ success: true });
});

// POST – Reset inventory to seed data
app.post('/api/admin/reset', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const seedPath = path.join(__dirname, 'seed.json');
  if (!fs.existsSync(seedPath)) {
    return res.status(500).json({ error: 'Seed file not found' });
  }

  try {
    const seed = JSON.parse(fs.readFileSync(seedPath, 'utf-8'));
    writeDB(seed);
    res.json({ success: true, count: seed.length });
  } catch (e) {
    res.status(500).json({ error: 'Failed to reset' });
  }
});

// ── Start server ─────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚗 Atlas EV Motors API running at http://localhost:${PORT}`);
  console.log(`   Health check: http://localhost:${PORT}/api/health`);
  console.log(`   Cars API:     http://localhost:${PORT}/api/cars\n`);
});
