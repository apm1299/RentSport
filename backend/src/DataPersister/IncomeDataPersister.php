<?php

namespace App\DataPersister;

use ApiPlatform\Core\DataPersister\DataPersisterInterface;
use App\Entity\Income;
use Doctrine\ORM\EntityManagerInterface;

class IncomeDataPersister implements DataPersisterInterface
{
    private $entityManager;

    public function __construct(
        EntityManagerInterface $entityManager, 
    )
    {
        $this->entityManager = $entityManager;
    }

    public function supports($data): bool
    {
        return $data instanceof Income;
    }

    /**
     * @param Income $data
     */
    public function persist($data, array $context = [])
    {
        $conditionIncomePost = $data instanceof Income && (($context['collection_operation_name'] ?? null) === 'post');
        $conditionIncomePatch = $data instanceof Income && (($context['item_operation_name'] ?? null) === 'patch');
        $conditionIncomePut = $data instanceof Income && (($context['item_operation_name'] ?? null) === 'put');

        $this->entityManager->persist($data, $context);
        $this->entityManager->flush();

        $userReceived = $data->getUserReceived();
        $totalQuantity = $userReceived->getWallet()+$data->getQuantity();
        $userReceived->setWallet($totalQuantity);

        $this->entityManager->persist($userReceived);
        $this->entityManager->flush();
    }

    
    public function remove($data, array $context = [])
    {
        $conditionIncomeDelete = $data instanceof Income && (($context['item_operation_name'] ?? null) === 'delete');

        $this->entityManager->remove($data);
        $this->entityManager->flush();
    }

}