<?php

namespace App\DataFixtures;

use App\Factory\CenterFactory;
use App\Factory\InstallationFactory;
use App\Factory\RentalFactory;
use App\Factory\RentalTypeFactory;
use App\Factory\SportFactory;
use App\Factory\UserFactory;
use App\Factory\UserRoleFactory;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        //CREACION DE ROLES MANUALES
        $superAdmin = UserRoleFactory::new()->create([
            'name' => 'SuperAdmin',
            'role' => 'ROLE_SUPERADMIN',
            'description' => 'Este rol permite administrar las empresas',
        ]);
        $admin = UserRoleFactory::new()->create([
            'name' => 'Admin',
            'role' => 'ROLE_ADMIN',
            'description' => 'Este rol permite administrar la empresa',
        ]);
        $user = UserRoleFactory::new()->create([
            'name' => 'Usuario',
            'role' => 'ROLE_USER',
            'description' => 'Este rol permite alquilar pistas',
        ]);

        //CREACION DE USUARIOS MANUALES
        $pep = UserFactory::new()->create([
            'name' => 'Pep',
            'surnames' => 'Guardiola Lopez',
            'email' => 'pep@gmail.com',
            'emailVerify' => true,
            'rol' => $superAdmin,
        ]);
        $cholo = UserFactory::new()->create([
            'name' => 'Cholo',
            'surnames' => 'Simeone',
            'email' => 'cholo@gmail.com',
            'emailVerify' => true,
            'rol' => $admin,
        ]);
        $chola = UserFactory::new()->create([
            'name' => 'Chola',
            'surnames' => 'Simeona',
            'email' => 'chola@gmail.com',
            'emailVerify' => true,
            'rol' => $admin,
        ]);
        $jose = UserFactory::new()->create([
            'name' => 'Jose',
            'surnames' => 'Mourinho Felix',
            'email' => 'maria@gmail.com',
            'emailVerify' => true,
            'rol' => $user,
        ]);

        //CREACION DE USUARIOS Y TABLA N:M
        UserFactory::createMany(10, function()  use ($admin, $user) {
            $item['rol'] = $user;

            return $item;
        });

        //CREACION DE CENTROS MANUALES
        $ayunVillacarrillo = CenterFactory::new()->create([
            'name' => 'Ayuntamiento Villacarrillo',
            'locality' => 'Villacarrillo',
            'province' => 'Jaen',
            'userAdmin' => $cholo,
        ]);
        $ayunLinares = CenterFactory::new()->create([
            'name' => 'Ayuntamiento Linares',
            'locality' => 'Linares',
            'province' => 'Jaen',
            'userAdmin' => $chola,

        ]);

        //CREACION DE CENTROS
        CenterFactory::createMany(3, function()  use ($admin) {
            $item['userAdmin'] = UserFactory::new()->create([
                'emailVerify' => true,
                'rol' => $admin
            ]);
            return $item;
        });

        //CREACION DE TIPOS DE ALQUILER MANUALES
        $normal = RentalTypeFactory::new()->create([
            'name' => 'Normal',
        ]);
        $evento = RentalTypeFactory::new()->create([
            'name' => 'Evento',
        ]);

        //CREACION DE INSTALACIONES DE ALQUILER MANUALES
        $pabellon = InstallationFactory::new()->create([
            'name' => 'Pabellon',
            'center' => $ayunVillacarrillo,
        ]);
        $pistaTenis1 = InstallationFactory::new()->create([
            'name' => 'Tenis 1',
            'center' => $ayunVillacarrillo,
        ]);
        $pistaTenis2 = InstallationFactory::new()->create([
            'name' => 'Tenis 2',
            'center' => $ayunVillacarrillo,
        ]);

        $padel1 = InstallationFactory::new()->create([
            'name' => 'Padel 1',
            'center' => $ayunVillacarrillo,
        ]);
        $padel2 = InstallationFactory::new()->create([
            'name' => 'Padel 2',
            'center' => $ayunVillacarrillo,
        ]);
        $padel3 = InstallationFactory::new()->create([
            'name' => 'Padel 3',
            'center' => $ayunVillacarrillo,
        ]);
        $pistaTenis3 = InstallationFactory::new()->create([
            'name' => 'Tenis',
            'center' => $ayunLinares,
        ]);
        $pabellon2 = InstallationFactory::new()->create([
            'name' => 'Pabellon',
            'center' => $ayunLinares,
        ]);


        //CREACION DE DEPORTES MANUALES
        $futbol = SportFactory::new()->create([
            'name' => 'Futbol',
            'installations' => [$pabellon,$pabellon2]
        ]);
        $tenis = SportFactory::new()->create([
            'name' => 'Tenis',
            'installations' => [$pistaTenis1, $pistaTenis2, $pistaTenis3]
        ]);
        $padel = SportFactory::new()->create([
            'name' => 'Padel',
            'installations' => [$padel1,$padel2,$padel3]
        ]);
        $baloncesto = SportFactory::new()->create([
            'name' => 'Baloncesto',
            'installations' => [$pabellon]
        ]);


        //ALQUILERES MANUALES
        RentalFactory::new()->create([
            'sport' => $futbol,
            'lessor' => $jose,
            'installation' => $pabellon,
            'type' => $normal,
        ]);
        RentalFactory::new()->create([
            'sport' => $futbol,
            'lessor' => $jose,
            'installation' => $pabellon,
            'type' => $normal,
        ]);
        RentalFactory::new()->create([
            'sport' => $tenis,
            'lessor' => $jose,
            'installation' => $pistaTenis1,
            'type' => $normal,
        ]);


        $manager->flush();
    }
}
