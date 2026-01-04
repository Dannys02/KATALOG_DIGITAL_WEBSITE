<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with("category")->latest()->get()->map(function ($p) {
            return [
                "id" => $p->id,
                "name" => $p->name,
                "price" => "Rp " . number_format($p->price, 0, ",", "."),
                "category" => $p->category->name ?? 'Uncategorized',
                "stock" => $p->stock,
                "description" => $p->description,
                "image" => asset("storage/" . $p->image),
            ];
        });
        return response()->json($products);
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                "name" => "required|string",
                "price" => "required|numeric",
                "stock" => "required|numeric",
                "category_id" => "required",
                "image" => "required|image|mimes:jpeg,png,jpg|max:2048",
            ]);

            $path = $request->file("image")->store("products", "public");

            $product = Product::create([
                "name" => $request->name,
                "price" => $request->price,
                "stock" => $request->stock,
                "category_id" => $request->category_id,
                "description" => $request->description,
                "image" => $path,
                "specifications" => json_decode($request->specifications, true) ?? [],
            ]);

            return response()->json($product, 201);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    // INI FUNGSI YANG TADI ILANG
    public function update(Request $request, $id)
    {
        try {
            $product = Product::findOrFail($id);

            $request->validate([
                "name" => "required|string",
                "price" => "required|numeric",
                "stock" => "required|numeric",
                "category_id" => "required",
                "image" => "nullable|image|mimes:jpeg,png,jpg|max:2048",
            ]);

            $data = [
                "name" => $request->name,
                "price" => $request->price,
                "stock" => $request->stock,
                "category_id" => $request->category_id,
                "description" => $request->description,
                "specifications" => json_decode($request->specifications, true) ?? $product->specifications,
            ];

            // Jika ada gambar baru diupload
            if ($request->hasFile("image")) {
                // Hapus gambar lama
                Storage::disk('public')->delete($product->image);
                // Simpan gambar baru
                $data["image"] = $request->file("image")->store("products", "public");
            }

            $product->update($data);

            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(["message" => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $product = Product::find($id);
        if($product) {
            Storage::disk('public')->delete($product->image);
            $product->delete();
            return response()->json(["message" => "Dihapus"]);
        }
        return response()->json(["message" => "Gagal"], 404);
    }
}
