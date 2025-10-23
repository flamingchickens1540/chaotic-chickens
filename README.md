# Chaotic Chickens

2025 Bunnybots scouting system

## Setup

1. install and setup `postgresql`
2. get an `API_KEY` from [theBlueAlliance](https://www.thebluealliance.com/account)
3. create `.env` file and add database url and api key

```bash
bun i
bun update
bun db:load # runs db migrations and generates types
```

Alternatively, if you don't need a local database for what you are doing, and don't want to setup `postgresql`

```bash
bun i
bun update
bun setup
```

## Run

```bash
bun dev
```
