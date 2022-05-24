<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;
use App\Repository\CenterRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: "center")]
#[ORM\Entity(repositoryClass: CenterRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['center:read']],
    denormalizationContext: ['groups' => ['center:write']],
)]
#[ApiFilter(SearchFilter::class, properties: ['name' => 'ipartial'])]
class Center
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', unique:true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['center:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['center:read', 'center:write'])]
    private $name;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['center:read', 'center:write'])]
    private $locality;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['center:read', 'center:write'])]
    private $province;

    #[ORM\OneToOne(inversedBy: 'center', targetEntity: User::class, cascade: ['persist', 'remove'])]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['center:read'])]
    private $userAdmin;

    #[ORM\OneToMany(mappedBy: 'center', targetEntity: Installation::class)]
    private $installations;

    public function __construct()
    {
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

    public function getUserAdmin(): ?User
    {
        return $this->userAdmin;
    }

    public function setUserAdmin(User $userAdmin): self
    {
        $this->userAdmin = $userAdmin;

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
            $installation->setCenter($this);
        }

        return $this;
    }

    public function removeInstallation(Installation $installation): self
    {
        if ($this->installations->removeElement($installation)) {
            // set the owning side to null (unless already changed)
            if ($installation->getCenter() === $this) {
                $installation->setCenter(null);
            }
        }

        return $this;
    }
}
