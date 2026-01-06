<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Http\Request;

Route::post("/login", [AuthController::class, "login"]);

Route::middleware("auth:sanctum")->group(function () {
  Route::get("/user", function (Request $request) {
    return $request->user();
  });
  Route::post("/logout", [AuthController::class, "logout"]);
});

Route::apiResource("products", ProductController::class);
