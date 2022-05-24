<?php

namespace App\Factory;

use App\Entity\RentalType;
use App\Repository\RentalTypeRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @extends ModelFactory<RentalType>
 *
 * @method static RentalType|Proxy createOne(array $attributes = [])
 * @method static RentalType[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static RentalType|Proxy find(object|array|mixed $criteria)
 * @method static RentalType|Proxy findOrCreate(array $attributes)
 * @method static RentalType|Proxy first(string $sortedField = 'id')
 * @method static RentalType|Proxy last(string $sortedField = 'id')
 * @method static RentalType|Proxy random(array $attributes = [])
 * @method static RentalType|Proxy randomOrCreate(array $attributes = [])
 * @method static RentalType[]|Proxy[] all()
 * @method static RentalType[]|Proxy[] findBy(array $attributes)
 * @method static RentalType[]|Proxy[] randomSet(int $number, array $attributes = [])
 * @method static RentalType[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static RentalTypeRepository|RepositoryProxy repository()
 * @method RentalType|Proxy create(array|callable $attributes = [])
 */
final class RentalTypeFactory extends ModelFactory
{
    public function __construct()
    {
        parent::__construct();

        // TODO inject services if required (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#factories-as-services)
    }

    protected function getDefaults(): array
    {
        return [
            // TODO add your default values here (https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#model-factories)
            'name' => self::faker()->text(),
        ];
    }

    protected function initialize(): self
    {
        // see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
        return $this
            // ->afterInstantiate(function(RentalType $rentalType): void {})
        ;
    }

    protected static function getClass(): string
    {
        return RentalType::class;
    }
}
