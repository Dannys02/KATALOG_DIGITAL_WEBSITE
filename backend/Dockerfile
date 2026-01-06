FROM php:8.2-cli

# Install dependencies sistem
RUN apt-get update && apt-get install -y \
libpng-dev \
libonig-dev \
libxml2-dev \
zip \
unzip \
git \
curl \
libicu-dev

# Install PHP extensions (Tambahkan intl karena Symfony membutuhkannya)
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd intl

# Get Composer
COPY --from = composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app
COPY . .

# Hapus folder vendor dan file lock lama jika ada untuk menghindari konflik di server
RUN rm -rf vendor composer.lock

# Install composer dependencies dengan flag tambahan agar tidak rewel soal versi
RUN composer install --no-dev --optimize-autoloader --ignore-platform-reqs

# Beri izin folder storage & cache
RUN chmod -R 777 storage bootstrap/cache

# Jalankan server
CMD php artisan serve --host = 0.0.0.0 --port = $ {
  PORT:-8080
}