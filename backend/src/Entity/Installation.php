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

    #[ORM\OneToMany(mappedBy: 'installation', targetEntity: Center::class)]
    private $center;

    #[ORM\OneToMany(mappedBy: 'installation', targetEntity: Rental::class)]
    private $rental;

    public function __construct()
    {
        $this->center = new ArrayCollection();
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

    /**
     * @return Collection<int, Center>
     */
    public function getCenter(): Collection
    {
        return $this->center;
    }

    public function addCenter(Center $center): self
    {
        if (!$this->center->contains($center)) {
            $this->center[] = $center;
            $center->setInstallation($this);
        }

        return $this;
    }

    public function removeCenter(Center $center): self
    {
        if ($this->center->removeElement($center)) {
            // set the owning side to null (unless already changed)
            if ($center->getInstallation() === $this) {
                $center->setInstallation(null);
            }
        }

        return $this;
    }

    public function getRental(): ?Rental
    {
        return $this->rental;
    }

    public function setRental(?Rental $rental): self
    {
        $this->rental = $rental;

        return $this;
    }
}
