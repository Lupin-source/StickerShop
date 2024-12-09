<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProductsTable extends Migration
{
    public function up()
    {
        /* Creation of Database */
        Schema::create('products', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('product_name'); // Item name
            $table->string('product_description'); // Item description
            $table->string('product_category'); // Item category
            $table->integer('product_available_quantity'); // Quantity available
            $table->decimal('product_amount', 8, 2); // Amount (with 2 decimal places)
            $table->string('product_barcode'); // Barcode
            $table->timestamps(); // Created at and updated at
        });
    }

    public function down()
    {
        Schema::dropIfExists('products'); // Rollback
    }
}
