<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\InstallationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: InstallationRepository::class)]
#[ApiResource]
class Installation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    private $name;

    #[ORM\Column(type: 'json')]
    private $schedure = [];

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    private $pricePerRange;

    #[ORM\ManyToOne(targetEntity: center::class, inversedBy: 'installations')]
    private $center;

    #[ORM\OneToMany(mappedBy: 'installation', targetEntity: Rental::class)]
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

    public function getSchedure(): ?array
    {
        return $this->schedure;
    }

    public function setSchedure(array $schedure): self
    {
        $this->schedure = $schedure;

        return $this;
    }

    public function getPricePerRange(): ?string
    {
        return $this->pricePerRange;
    }

    public function setPricePerRange(string $pricePerRange): self
    {
        $this->pricePerRange = $pricePerRange;

        return $this;
    }

    public function getCenter(): ?center
    {
        return $this->center;
    }

    public function setCenter(?center $center): self
    {
        $this->center = $center;

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
            $rental->setInstallation($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getInstallation() === $this) {
                $rental->setInstallation(null);
            }
        }

        return $this;
    }
}
