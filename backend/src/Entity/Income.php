<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\IncomeRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Table(name: "income")]
#[ORM\Entity(repositoryClass: IncomeRepository::class)]
#[ApiResource(
    order: ['date'=> 'DESC'],
    forceEager: false,
    normalizationContext: ['groups' => ['Income:read']],
    denormalizationContext: ['groups' => ['Income:write']],
)]
class Income
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['Income:read'])]
    private $id;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['Income:read','Income:write'])]
    private $date;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['Income:read','Income:write'])]
    private $quantity;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'incomesMade')]
    #[Groups(['Income:read','Income:write'])]
    #[ApiProperty(
        readableLink: true
    )]
    private $userMade;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'incomesReceived')]
    #[Groups(['Income:read','Income:write'])]
    #[ApiProperty(
        readableLink: true,
        writableLink: true
    )]
    private $userReceived;

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
     * @return mixed
     */
    public function getQuantity()
    {
        return $this->quantity;
    }

    /**
     * @param mixed $wallet
     * @return User
     */
    public function setQuantity($quantity)
    {
        $this->quantity = $quantity;
        return $this;
    }

    public function getUserMade(): ?User
    {
        return $this->userMade;
    }

    public function setUserMade(?User $userMade): self
    {
        $this->userMade = $userMade;

        return $this;
    }

    public function getUserReceived(): ?User
    {
        return $this->userReceived;
    }

    public function setUserReceived(?User $userReceived): self
    {
        $this->userReceived = $userReceived;

        return $this;
    }

}
