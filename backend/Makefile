.PHONY: up down build seed smoke

up:
	docker compose up --build -d

down:
	docker compose down

build:
	docker compose build

seed:
	# run seed scripts inside each service container
	docker compose run --rm user npm run seed
	docker compose run --rm post npm run seed
	docker compose run --rm comment npm run seed

smoke:
	node ./scripts/smoke-test.js
