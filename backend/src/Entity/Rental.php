<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiSubresource;
use App\Repository\RentalRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Core\Bridge\Doctrine\Orm\Filter\SearchFilter;


#[ORM\Entity(repositoryClass: RentalRepository::class)]
#[ApiResource(
    forceEager: false,
    normalizationContext: ['groups' => ['Rental:read']],
    denormalizationContext: ['groups' => ['Rental:write']],
)]
#[ApiFilter(SearchFilter::class, properties: ['schedule' => 'exact', 'type.id' => 'exact', 'installation.center.id' => 'exact'])]
class Rental
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['Rental:read','RentalType:read'])]
    private $id;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['Rental:read', 'Rental:write','installation:read'])]
    private $date;

    #[ORM\ManyToOne(targetEntity: Sport::class, inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Rental:read', 'Rental:write', 'installation:read'])]
    #[ApiProperty(readableLink:true)]
    private $sport;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Rental:read', 'Rental:write', 'installation:read'])]
    #[ApiSubresource()]
    #[ApiProperty(readableLink:true)]
    private $lessor;

    #[ORM\ManyToOne(targetEntity: Installation::class, inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Rental:read', 'Rental:write', 'installation:read'])]
        #[ApiProperty(readableLink:true)]

    private $installation;

    #[ORM\ManyToOne(targetEntity: RentalType::class, inversedBy: 'rentals')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['Rental:read', 'Rental:write'])]
    #[ApiSubresource()]
    private $type;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Groups(['Rental:read', 'Rental:write','installation:read'])]
    #[ApiSubresource()]
    private $schedule;

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

    public function getSport(): ?Sport
    {
        return $this->sport;
    }

    public function setSport(?Sport $sport): self
    {
        $this->sport = $sport;

        return $this;
    }

    public function getLessor(): ?User
    {
        return $this->lessor;
    }

    public function setLessor(?User $lessor): self
    {
        $this->lessor = $lessor;

        return $this;
    }

    public function getSchedule(): string
    {
        return $this->schedule;
    }

    public function setSchedule(string $schedule): self
    {
        $this->schedule = $schedule;

        return $this;
    }

    public function getInstallation(): ?Installation
    {
        return $this->installation;
    }

    public function setInstallation(?Installation $installation): self
    {
        $this->installation = $installation;

        return $this;
    }

    public function getType(): ?RentalType
    {
        return $this->type;
    }

    public function setType(?RentalType $type): self
    {
        $this->type = $type;

        return $this;
    }
}
