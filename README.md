# Challenge-mcrosi

## Description

![Solar System](https://github.com/mcrosignani/challenge-mcrosi/solarSystem.png)

API that allows predict the weather based on the position of the planets, and their relationship with the sun

## Technologies

- NodeJS v10.17
- Typescript
- PostgreSQL
- Typeorm
- Koa

## Get Started

Download source or clone repository and run next commands:

```
npm install
npm run dev
```

## Deployment

The production app is hosted with Pivotal - Cloud Foundry. The cloud app uses ElephantSQL as a service for DB.

## API Endpoints

### GET: / (Home)
https://api-challenge-mcrosi-sweet-buffalo-yr.cfapps.io/

### POST: /prediction
https://api-challenge-mcrosi-sweet-buffalo-yr.cfapps.io/prediction

An idempotent method that calculate the position of the planets in every day, and predict the weather of the system.

**Body (JSON)**
{
	"days": 3650
}

## GET: /vulcano/:day
https://api-challenge-mcrosi-sweet-buffalo-yr.cfapps.io/vulcano/5

Return details of the system on an specific day

## GET: /statistics
https://api-challenge-mcrosi-sweet-buffalo-yr.cfapps.io/statistics
