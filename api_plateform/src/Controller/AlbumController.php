<?php

namespace App\Controller;

use App\Entity\Album;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AlbumController extends AbstractController {


    /**
     * @Route("/web/albums", name="api-web-albums")
     *
     * @param ObjectManager $manager
     * @return void
     */
    public function getAlbums(ObjectManager $manager) 
    {
        $albums = $albums = $manager->getRepository(Album::class)->findAll();

        $data = [];
        $i = 0;

        foreach($albums as $album) {
            $row = [
                'id'        => $album->getId(),
                'name'      => $album->getName(),
                'imageName' => $album->getImageName()
            ];
            $data[$i++] = $row;
        }

        return new JsonResponse($data);
    }
   
    /**
     * @Route("/web/album/{id}", name="api-web-album")
     *
     * @param Request $request
     * @param ObjectManager $manager
     * @param [type] $id
     * @return void
     */ 
    public function getAlbum(Request $request, ObjectManager $manager, $id) 
    {
        $album = $manager->getRepository(Album::class)->find($id);

        $data = [
            'id'        => $album->getId(),
            'name'      => $album->getName(),
            'imageName' => $album->getImageName(),
            'date'      => $album->getPublishedAt(),
            'price'     => $album->getPrice(),
            'artist'    => $album->getArtistsName(),
            'style'     => $album->getTypesName(),
        ];

        return new JsonResponse($data);
    }

}