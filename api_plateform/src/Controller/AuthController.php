<?php

namespace App\Controller;

use App\Entity\User;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Common\Persistence\ObjectManager;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use phpDocumentor\Reflection\Types\Void_;

class AuthController extends AbstractController
{
    /**
     * @Route(name="web_register", path="/web/register")
     *
     * @param Request $request
     * @param UserPasswordEncoderInterface $encoder
     * @return void
     */
    public function register(ObjectManager $manager, UserPasswordEncoderInterface $encoder)
    {
        $data = json_decode(file_get_contents("php://input"));
        
        $user = new User();

        $user->setName($data->name);
        $user->setFirstName($data->firstname);
        $user->setAddress($data->address);
        $user->setNumber($data->number);
        $user->setPostalCode($data->postal_code);
        $user->setCity($data->city);
        $user->setEmail($data->email);
        $user->setPassword($encoder->encodePassword($user, $data->password));
        $user->setRoles($data->roles);
        $user->setApiToken();

        $manager->persist($user);
        $manager->flush();
        return new JsonResponse('ok'); 
    }

    /**
     * @Route(path="/web/token", name="token");
     *
     * @param ObjectManager $manager
     * @return void
     */
   public function resetUserToken(ObjectManager $manager) 
    {
        $data = json_decode(file_get_contents('php://input'));

        $user = $this->checkUser($data, $manager);
        if ($user === false) {
            return new JsonResponse('Not any token is available');
        }

        $user->setApiToken();
        $manager->persist($user);
        $manager->flush();

        $token = $user->getApiToken();

        return new JsonResponse($token);
    }

    /**
     * PRIVATE function
     *
     * @param [type] $data
     * @param [type] $manager
     * @return void
     */
    private function checkUser($data, $manager) 
    {
        if (empty($data) OR \is_null($data)) {
            return false;
        }

        $user = $manager->getRepository(User::class)->find($data->id);

        if ($user->getApiToken() !== $data->token) {
            return false;
        }

        return $user;
    }

    /**
     * @Route("/web/login", name="api_login", methods={"POST"})
     */
    public function login()
    {
        $user = $this->getUser();

        return new JsonResponse([
            'id'        => $user->getId(),
            'name'      => $user->getName(),
            'firstname' => $user->getFirstName(), 
            'apiToken'  => $user->getApiToken(),
            'role'      => $user->getRoles(),
            'email'     => $user->getEmail(),
        ]);
    }

}
