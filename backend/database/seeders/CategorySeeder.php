<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        // Ini cara paksa masukin data tanpa peduli proteksi fillable
        Category::unguard(); 
        
        Category::updateOrCreate(['id' => 1], ['name' => 'Pakaian']);
        Category::updateOrCreate(['id' => 2], ['name' => 'Sepatu']);
        Category::updateOrCreate(['id' => 3], ['name' => 'Tas']);
        Category::updateOrCreate(['id' => 4], ['name' => 'Aksesoris']);
        Category::updateOrCreate(['id' => 5], ['name' => 'Kecantikan']);
        
        Category::reguard();
    }
}
