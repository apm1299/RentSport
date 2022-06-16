<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\SportRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: SportRepository::class)]
#[ApiResource(
    forceEager: false,
    normalizationContext: ['groups' => ['Sport:read']],
    denormalizationContext: ['groups' => ['Sport:write']],
)]
class Sport
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['Sport:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['Sport:read', 'Sport:write','installation:read', 'Rental:read'])]
    private $name;

    #[ORM\OneToMany(mappedBy: 'sport', targetEntity: Rental::class)]
    private $rentals;

    #[ORM\ManyToMany(targetEntity: Installation::class, inversedBy: 'sports')]
    #[Groups(['Sport:read', 'Sport:write'])]
    private $installations;

    public function __construct()
    {
        $this->rentals = new ArrayCollection();
        $this->installations = new ArrayCollection();
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
            $rental->setSport($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getSport() === $this) {
                $rental->setSport(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Installation>
     */
    public function getInstallations(): Collection
    {
        return $this->installations;
    }

    public function addInstallation(Installation $installation): self
    {
        if (!$this->installations->contains($installation)) {
            $this->installations[] = $installation;
        }

        return $this;
    }

    public function removeInstallation(Installation $installation): self
    {
        $this->installations->removeElement($installation);

        return $this;
    }

}
