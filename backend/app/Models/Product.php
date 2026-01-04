<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'name', 'price', 'stock', 'category_id', 'description', 'image', 'specifications'
    ];

    protected $casts = [
        'specifications' => 'array',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
