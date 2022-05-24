<?php

namespace App\Factory;

use App\Entity\Center;
use App\Repository\CenterRepository;
use Zenstruck\Foundry\RepositoryProxy;
use Zenstruck\Foundry\ModelFactory;
use Zenstruck\Foundry\Proxy;

/**
 * @extends ModelFactory<Center>
 *
 * @method static Center|Proxy createOne(array $attributes = [])
 * @method static Center[]|Proxy[] createMany(int $number, array|callable $attributes = [])
 * @method static Center|Proxy find(object|array|mixed $criteria)
 * @method static Center|Proxy findOrCreate(array $attributes)
 * @method static Center|Proxy first(string $sortedField = 'id')
 * @method static Center|Proxy last(string $sortedField = 'id')
 * @method static Center|Proxy random(array $attributes = [])
 * @method static Center|Proxy randomOrCreate(array $attributes = [])
 * @method static Center[]|Proxy[] all()
 * @method static Center[]|Proxy[] findBy(array $attributes)
 * @method static Center[]|Proxy[] randomSet(int $number, array $attributes = [])
 * @method static Center[]|Proxy[] randomRange(int $min, int $max, array $attributes = [])
 * @method static CenterRepository|RepositoryProxy repository()
 * @method Center|Proxy create(array|callable $attributes = [])
 */
final class CenterFactory extends ModelFactory
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
            'name' => self::faker()->company(),
            'locality' => self::faker()->city(),
            'province' => self::faker()->city(),
        ];
    }

    protected function initialize(): self
    {
        // see https://symfony.com/bundles/ZenstruckFoundryBundle/current/index.html#initialization
        return $this
            // ->afterInstantiate(function(Center $center): void {})
        ;
    }

    protected static function getClass(): string
    {
        return Center::class;
    }
}
