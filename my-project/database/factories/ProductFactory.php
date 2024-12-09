<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     */
    public function definition()
    {
        $shoeCategories = ['Sneakers', 'Loafers', 'Cycling Shoes', 'Sandals'];
        $productNames = ['Nike Air Max', 'Adidas Boost', 
                        'New Balance 574', 'Puma RS-X', 
                        'Vans Old Skool', 'Converse Chuck Taylor', 
                        'Fila Disruptor', 'Asics Gel', 
                        'Reebok Classic', 'Under Armour', 
                        'New Balance 990', 'Asics GEL-Kayano', 
                        'Reebok CrossFit', 'Under Armour SpeedForm', 
                        'New Balance 992', 'Asics GEL-Kayano', 
                        'Reebok CrossFit', 'Under Armour SpeedForm', 
                        'New Balance 992', 'Asics GEL-Kayano', 
                        'Reebok CrossFit', 'Under Armour SpeedForm'];
        
        return [
            'product_name' => $this->faker->randomElement($productNames) . ' ' . $this->faker->colorName(),
            'product_description' => $this->faker->sentence(10),
            'product_category' => $this->faker->randomElement($shoeCategories),
            'product_amount' => $this->faker->randomFloat(2, 49.99, 299.99),
            'product_available_quantity' => $this->faker->numberBetween(1, 50),
            'product_barcode' => 'P-' . $this->faker->unique()->numerify('##########'),
        ];
    }
}
