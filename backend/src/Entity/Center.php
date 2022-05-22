<?php

namespace App\Entity;

use App\Repository\CenterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CenterRepository::class)]
class Center
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    private $name;

    #[ORM\Column(type: 'string', length: 40)]
    private $locality;

    #[ORM\Column(type: 'string', length: 40)]
    private $province;

    #[ORM\OneToMany(mappedBy: 'center', targetEntity: User::class)]
    private $userAdmin;

    public function __construct()
    {
        $this->userAdmin = new ArrayCollection();
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

    public function getLocality(): ?string
    {
        return $this->locality;
    }

    public function setLocality(string $locality): self
    {
        $this->locality = $locality;

        return $this;
    }

    public function getProvince(): ?string
    {
        return $this->province;
    }

    public function setProvince(string $province): self
    {
        $this->province = $province;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUserAdmin(): Collection
    {
        return $this->userAdmin;
    }

    public function addUserAdmin(User $userAdmin): self
    {
        if (!$this->userAdmin->contains($userAdmin)) {
            $this->userAdmin[] = $userAdmin;
            $userAdmin->setCenter($this);
        }

        return $this;
    }

    public function removeUserAdmin(User $userAdmin): self
    {
        if ($this->userAdmin->removeElement($userAdmin)) {
            // set the owning side to null (unless already changed)
            if ($userAdmin->getCenter() === $this) {
                $userAdmin->setCenter(null);
            }
        }

        return $this;
    }
}
