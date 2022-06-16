<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\RentalTypeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: RentalTypeRepository::class)]
#[ApiResource(
    forceEager: false,
    normalizationContext: ['groups' => ['RentalType:read']],
    denormalizationContext: ['groups' => ['RentalType:write']],
)]
class RentalType
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['RentalType:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['RentalType:read', 'RentalType:write'])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'type', targetEntity: Rental::class)]
    #[Groups(['RentalType:read', 'RentalType:write'])]
    #[ApiSubresource()]
    private $rentals;

    public function __construct()
    {
        $this->rentals = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    /**
     * @return Collection<int, Rental>
     */
    public function getRentals(): Collection
    {
        return $this->rentals;
    }

    public function addRental(Rental $rental): self
    {
        if (!$this->rentals->contains($rental)) {
            $this->rentals[] = $rental;
            $rental->setType($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getType() === $this) {
                $rental->setType(null);
            }
        }

        return $this;
    }

}
