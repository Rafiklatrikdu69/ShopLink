<?php

namespace App\Controller;




namespace App\Controller;

use App\Entity\User;

use Doctrine\ORM\EntityManagerInterface;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class ConnexionController extends AbstractController
{
    #[Route('/connexion', name: 'app_connexion')]
    public function index(Request $request,EntityManagerInterface $entityManager): Response
    {
        try {
            $responseData = json_decode($request->getContent(), true);
            $user = $entityManager->getRepository(User::class)->findOneBySomeField($responseData['pseud']);
            $password = $entityManager->getRepository(User::class)->findPassword($responseData['pwd']);

            if (!$user || !$password) {
                return new JsonResponse(['requete' => false]);
            }
            return new JsonResponse(['requete' => true]);
            
        } catch (\Exception $e) {
         
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}

