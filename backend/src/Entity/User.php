<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiFilter;
use ApiPlatform\Core\Annotation\ApiProperty;
use ApiPlatform\Core\Annotation\ApiResource;
use App\Filter\FullTextSearchFilter;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[ApiResource(
    forceEager: false,
    normalizationContext: ['groups' => ['User:read']],
    denormalizationContext: ['groups' => ['User:write']],
)]
#[ApiFilter(FullTextSearchFilter::class, properties:[
    "name" => "ipartial",
    "surnames" => "ipartial",
])]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer', unique:true)]
    #[ApiProperty(identifier: true)]
    #[Groups(['User:read', 'center:read'])]
    private $id;

    #[ORM\Column(type: 'string', length: 40)]
    #[Groups(['User:read', 'User:write', 'installation:read', 'Income:read'])]
    private $name;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['User:read', 'User:write', 'installation:read', 'Income:read'])]
    private $surnames;

    #[ORM\Column(type: 'string', length: 50)]
    #[Groups(['User:read', 'User:write'])]
    private $email;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['User:read', 'User:write'])]
    private $emailVerify = false;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(['User:read', 'User:write'])]
    private $password;

    #[ORM\Column(type: 'string', length: 255, nullable: true)]
    #[Groups(['User:read', 'User:write'])]
    private $image;

    #[ORM\Column(type: 'decimal', precision: 10, scale: 2)]
    #[Groups(['User:read', 'User:write'])]
    private $wallet;

    #[ORM\OneToOne(mappedBy: 'userAdmin', targetEntity: Center::class, cascade: ['persist', 'remove'])]
    private $center;

    #[ORM\OneToMany(mappedBy: 'lessor', targetEntity: Rental::class)]
    private $rentals;

    #[ORM\ManyToMany(targetEntity: UserRole::class, inversedBy: 'users')]
    #[ORM\JoinTable(name: "users_roles_rel")]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id")]
    #[ORM\InverseJoinColumn(name: "role_id", referencedColumnName: "id")]
    #[Groups(['User:read', 'User:write'])]
    private $userRoles;

    #[ORM\OneToMany(mappedBy: 'userMade', targetEntity: Income::class)]
    private $incomesMade;


    public function __construct()
    {
        $this->userRoles = new ArrayCollection();
        $this->rentals = new ArrayCollection();
        $this->incomesMade = new ArrayCollection();
    }

    public function getId(): int
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

    /**
     * @return mixed
     */
    public function getEmailVerify(): ?bool
    {
        return $this->emailVerify;
    }

    /**
     * @param mixed $emailVerify
     * @return User
     */
    public function setEmailVerify($emailVerify): self
    {
        $this->emailVerify = $emailVerify;
        return $this;
    }


    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getImage()
    {
        return $this->image;
    }

    /**
     * @param mixed $image
     * @return User
     */
    public function setImage($image)
    {
        $this->image = $image;
        return $this;
    }

    /**
     * @return mixed
     */
    public function getWallet()
    {
        return $this->wallet;
    }

    /**
     * @param mixed $wallet
     * @return User
     */
    public function setWallet($wallet)
    {
        $this->wallet = $wallet;
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

    /**
     * @return Collection<int, UserRole>
     */
    public function getUserRoles(): ?Collection
    {
        return $this->userRoles;
    }

    public function addUserRole(UserRole $userRole): self
    {

        if (!$this->userRoles->contains($userRole)) {
            $this->userRoles[] = $userRole;
        }

        return $this;
    }

    public function removeUserRole(UserRole $userRole): self
    {
        $this->userRoles->removeElement($userRole);

        return $this;
    }



     /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    public function getUsername(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials()
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getRoles(): array
    {
        $roles = array_map(fn (UserRole $role) => $role->getRole(), $this->userRoles->toArray());
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    /**
     * @return Collection<int, Income>
     */
    public function getIncomesMade(): Collection
    {
        return $this->incomesMade;
    }

    public function addIncomesMade(Income $incomesMade): self
    {
        if (!$this->incomesMade->contains($incomesMade)) {
            $this->incomesMade[] = $incomesMade;
            $incomesMade->setUserMade($this);
        }

        return $this;
    }

    public function removeIncomesMade(Income $incomesMade): self
    {
        if ($this->incomesMade->removeElement($incomesMade)) {
            // set the owning side to null (unless already changed)
            if ($incomesMade->getUserMade() === $this) {
                $incomesMade->setUserMade(null);
            }
        }

        return $this;
    }

}
