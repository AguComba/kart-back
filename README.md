# Karting Session Logbook API

Backend para registrar sesiones de karting con arquitectura hexagonal (domain / application / infrastructure / interfaces).

## Requisitos
- Node.js 18+
- Docker (opcional, para PostgreSQL)

## Configuración
Copia `.env.example` a `.env` y ajusta valores.

```bash
cp .env.example .env
```

## Comandos
```bash
# Desarrollo
npm run dev

# Build
npm run build

# Migraciones
npm run migration:generate
npm run migration:run

# Seed de ejemplo
npm run seed
```

## Swagger
- `http://localhost:3000/docs`

## Endpoints principales
- `GET/POST /tracks`
- `GET/PUT/DELETE /tracks/:id`
- `GET/POST /tiresets`
- `GET/POST /setups`
- `GET/POST /session-days`
- `GET /session-days/:id`
- `POST /session-days/:id/conditions`
- `POST /session-days/:id/stints`
- `GET /session-days/:id/stints`
- `PUT/DELETE /stints/:id`
- `POST /session-days/:id/stints/duplicate-last`

## Seeds incluidos
- 1 Track
- 1 SessionDay con condición
- 2 Stints con referencia a TireSet, KartSetup y GearRatio
