<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource]
class User implements \Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    private $name;

    #[ORM\Column(type: 'string', length: 50)]
    private $surnames;

    #[ORM\Column(type: 'string', length: 50)]
    private $email;

    #[ORM\Column(type: 'boolean')]
    private $emailVerify;

    #[ORM\Column(type: 'string', length: 255)]
    private $password;

    #[ORM\OneToOne(inversedBy: 'owner', targetEntity: UserImage::class, cascade: ['persist', 'remove'])]
    private $image;

    #[ORM\OneToOne(mappedBy: 'userAdmin', targetEntity: Center::class, cascade: ['persist', 'remove'])]
    private $center;

    #[ORM\OneToMany(mappedBy: 'lessor', targetEntity: Rental::class)]
    private $rentals;

    #[ORM\ManyToOne(targetEntity: UserRole::class, inversedBy: 'users')]
    #[ORM\JoinColumn(nullable: false)]
    private $rol;

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

    public function getSurnames(): ?string
    {
        return $this->surnames;
    }

    public function setSurnames(string $surnames): self
    {
        $this->surnames = $surnames;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function isEmailVerify(): ?bool
    {
        return $this->emailVerify;
    }

    public function setEmailVerify(bool $emailVerify): self
    {
        $this->emailVerify = $emailVerify;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    public function getImage(): ?UserImage
    {
        return $this->image;
    }

    public function setImage(?UserImage $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getCenter(): ?Center
    {
        return $this->center;
    }

    public function setCenter(Center $center): self
    {
        // set the owning side of the relation if necessary
        if ($center->getUserAdmin() !== $this) {
            $center->setUserAdmin($this);
        }

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
            $rental->setLessor($this);
        }

        return $this;
    }

    public function removeRental(Rental $rental): self
    {
        if ($this->rentals->removeElement($rental)) {
            // set the owning side to null (unless already changed)
            if ($rental->getLessor() === $this) {
                $rental->setLessor(null);
            }
        }

        return $this;
    }

    public function getRol(): ?UserRole
    {
        return $this->rol;
    }

    public function setRol(?UserRole $rol): self
    {
        $this->rol = $rol;

        return $this;
    }

}
