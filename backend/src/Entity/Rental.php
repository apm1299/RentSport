<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\RentalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RentalRepository::class)]
#[ApiResource]
class Rental
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'datetime')]
    private $date;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'rental')]
    private $lessor;

    #[ORM\ManyToOne(targetEntity: Sport::class, inversedBy: 'rental')]
    private $sport;

    #[ORM\ManyToOne(targetEntity: Installation::class, inversedBy: 'rental')]
    private $installation;

    #[ORM\ManyToOne(targetEntity: RentalType::class, inversedBy: 'rental')]
    private $type;

    public function __construct()
    {
        $this->lessor = new ArrayCollection();
        $this->sport = new ArrayCollection();
        $this->installation = new ArrayCollection();
        $this->type = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): self
    {
        $this->date = $date;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getLessor(): Collection
    {
        return $this->lessor;
    }

    public function addLessor(User $lessor): self
    {
        if (!$this->lessor->contains($lessor)) {
            $this->lessor[] = $lessor;
            $lessor->setRental($this);
        }

        return $this;
    }

    public function removeLessor(User $lessor): self
    {
        if ($this->lessor->removeElement($lessor)) {
            // set the owning side to null (unless already changed)
            if ($lessor->getRental() === $this) {
                $lessor->setRental(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Sport>
     */
    public function getSport(): Collection
    {
        return $this->sport;
    }

    public function addSport(Sport $sport): self
    {
        if (!$this->sport->contains($sport)) {
            $this->sport[] = $sport;
            $sport->setRental($this);
        }

        return $this;
    }

    public function removeSport(Sport $sport): self
    {
        if ($this->sport->removeElement($sport)) {
            // set the owning side to null (unless already changed)
            if ($sport->getRental() === $this) {
                $sport->setRental(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Installation>
     */
    public function getInstallation(): Collection
    {
        return $this->installation;
    }

    public function addInstallation(Installation $installation): self
    {
        if (!$this->installation->contains($installation)) {
            $this->installation[] = $installation;
            $installation->setRental($this);
        }

        return $this;
    }

    public function removeInstallation(Installation $installation): self
    {
        if ($this->installation->removeElement($installation)) {
            // set the owning side to null (unless already changed)
            if ($installation->getRental() === $this) {
                $installation->setRental(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, RentalType>
     */
    public function getType(): Collection
    {
        return $this->type;
    }

    public function addType(RentalType $type): self
    {
        if (!$this->type->contains($type)) {
            $this->type[] = $type;
            $type->setRental($this);
        }

        return $this;
    }

    public function removeType(RentalType $type): self
    {
        if ($this->type->removeElement($type)) {
            // set the owning side to null (unless already changed)
            if ($type->getRental() === $this) {
                $type->setRental(null);
            }
        }

        return $this;
    }
}
