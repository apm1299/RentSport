<?php

namespace App\Factory;

use App\Entity\Sport;
use App\Repository\SportRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @extends ModelFactory<Sport>
 *
 * @method static Sport|Proxy createOne(array $attributes = [])
 * @method static Sport[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Sport|Proxy find(object|array|mixed $criteria)
 * @method static Sport|Proxy findOrCreate(array $attributes)
 * @method static Sport|Proxy first(string $sortedField = 'id')
 * @method static Sport|Proxy last(string $sortedField = 'id')
 * @method static Sport|Proxy random(array $attributes = [])
 * @method static Sport|Proxy randomOrCreate(array $attributes = [])
 * @method static Sport[]|Proxy[] all()
 * @method static Sport[]|Proxy[] findBy(array $attributes)
 * @method static Sport[]|Proxy[] randomSet(int $number, array $attributes = [])
 * @method static Sport[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static SportRepository|RepositoryProxy repository()
 * @method Sport|Proxy create(array|callable $attributes = [])
 */
final class SportFactory extends ModelFactory
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
            // ->afterInstantiate(function(Sport $sport): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Sport::class;
    }
}
