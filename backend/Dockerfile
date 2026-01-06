FROM php:8.2-cli

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev zip unzip git curl

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Get Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Install composer dependencies
RUN composer install --no-dev --optimize-autoloader

# Beri izin folder storage
RUN chmod -R 777 storage bootstrap/cache

# Jalankan server menggunakan port dari Railway
CMD php artisan serve --host=0.0.0.0 --port=${PORT:-8080}

