<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use ApiPlatform\Core\Annotation\ApiProperty;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @apiResource()
 * @ORM\Entity
 */
class Album
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     *
     * @var string
     */
    private $imageName;

    /**
     * @ORM\Column(type="datetime")
     *
     * @var \DateTime
     */
    private $publishedAt;

    /**
     * @ORM\Column(type="float")
     */
    private $price;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Comment", mappedBy="album", orphanRemoval=true)
     */
    private $comments;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Artist", inversedBy="album")
     * @ORM\JoinColumn(name="artists_id", referencedColumnName="id")
     */
    private $artists;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Type", inversedBy="album")
     * @ORM\JoinColumn(name="types_id", referencedColumnName="id")
     */
    private $types;

    public function __construct()
    {
        $this->comments = new ArrayCollection();
        $this->publishedAt = $this->createdAt= new \DateTime();
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

    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    public function setImageName(?string $imageName): self
    {
        $this->imageName = $imageName;

        return $this;
    }

    public function getPublishedAt(): ?\DateTimeInterface
    {
        return $this->publishedAt;
    }

    public function setPublishedAt(\DateTimeInterface $publishedAt): self
    {
        $this->publishedAt = $publishedAt;

        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }

    /**
     * @return Collection|Comment[]
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setAlbum($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->contains($comment)) {
            $this->comments->removeElement($comment);
            // set the owning side to null (unless already changed)
            if ($comment->getAlbum() === $this) {
                $comment->setAlbum(null);
            }
        }

        return $this;
    }

    public function getArtists()
    {
        return $this->artists;
    }

    public function setArtists(?Artist $artists): self
    {
        $this->artists = $artists;

        return $this;
    }

    public function getTypes()
    {
        return $this->types;
    }

    public function setTypes(?Type $types): self
    {
        $this->types = $types;

        return $this;
    }

    /*------------------------------------------------------------------------------------------
    * Get the true name of artists to send in json format at angular
    -------------------------------------------------------------------------------------------*/
   
    public function getArtistsName() : ?string {
        return $this->artists->getName();
    }

    public function getTypesName() : ?string {
        return $this->types->getName();
    }
}
