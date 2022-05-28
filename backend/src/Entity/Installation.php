<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\InstallationRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: "installation")]
#[ORM\Entity(repositoryClass: InstallationRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['installation:read']],
    denormalizationContext: ['groups' => ['installation:write']],
)]
class Installation
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', unique:true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['installation:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['installation:read','installation:write'])]
    private $name;

    #[ORM\Column(type: 'json')]
    #[Groups(['installation:read','installation:write'])]
    private $schedure = [];

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['installation:read','installation:write'])]
    private $pricePerRange;

    #[ORM\ManyToOne(targetEntity: Center::class, inversedBy: 'installations')]
    #[Groups(['installation:read','installation:write'])]
    #[ApiSubresource()]
    private $center;

    #[ORM\OneToMany(mappedBy: 'installation', targetEntity: Rental::class)]
    #[Groups(['installation:read','installation:write'])]
    private $rentals;

    #[ORM\ManyToMany(targetEntity: Sport::class, mappedBy: 'installations')]
    #[ApiSubresource()]
    private $sports;

    public function __construct()
    {
        $this->rentals = new ArrayCollection();
        $this->sports = new ArrayCollection();
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

    /**
     * @return Collection<int, Sport>
     */
    public function getSports(): Collection
    {
        return $this->sports;
    }

    public function addSport(Sport $sport): self
    {
        if (!$this->sports->contains($sport)) {
            $this->sports[] = $sport;
            $sport->addInstallation($this);
        }

        return $this;
    }

    public function removeSport(Sport $sport): self
    {
        if ($this->sports->removeElement($sport)) {
            $sport->removeInstallation($this);
        }

        return $this;
    }
}
