<?php

namespace App\Factory;

use App\Entity\Rental;
use App\Repository\RentalRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @extends ModelFactory<Rental>
 *
 * @method static Rental|Proxy createOne(array $attributes = [])
 * @method static Rental[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Rental|Proxy find(object|array|mixed $criteria)
 * @method static Rental|Proxy findOrCreate(array $attributes)
 * @method static Rental|Proxy first(string $sortedField = 'id')
 * @method static Rental|Proxy last(string $sortedField = 'id')
 * @method static Rental|Proxy random(array $attributes = [])
 * @method static Rental|Proxy randomOrCreate(array $attributes = [])
 * @method static Rental[]|Proxy[] all()
 * @method static Rental[]|Proxy[] findBy(array $attributes)
 * @method static Rental[]|Proxy[] randomSet(int $number, array $attributes = [])
 * @method static Rental[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static RentalRepository|RepositoryProxy repository()
 * @method Rental|Proxy create(array|callable $attributes = [])
 */
final class RentalFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();

        // TODO inject services if required (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services)
    }

    protected function getDefaults(): array
    {
        $date = self::faker()->dateTimeBetween('-2 days','now');
        return [
            // TODO add your default values here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories)
            'date' => $date,
        ];
    }

    protected function initialize(): self
    {
        // see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
        return $this
            // ->afterInstantiate(function(Rental $rental): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Rental::class;
    }
}
