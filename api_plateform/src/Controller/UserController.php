<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class UserController extends AbstractController {

    /**
     * @Route(path="/admin/admin_users", name="admin_users")
     *
     * @param ObjectManager $manager
     * @return void
     */
    public function getAdminUsers(ObjectManager $manager)
    {
        $repo  = $manager->getRepository(User::class);
        $users = $repo->getAdminUsers();

        return new JsonResponse($users);
    }

    /**
     * @Route(path="/admin/users", name="users")
     *
     * @param ObjectManager $manager
     * @return void
     */
    public function getUsers(ObjectManager $manager)
    {
        $repo  = $manager->getRepository(User::class);
        $users = $repo->getUsers();

        return new JsonResponse($users);
    }
}