<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class InscriptionController extends AbstractController
{
    #[Route('/inscription', name: 'app_inscription')]
    public function index(Request $request,EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $responseData = json_decode($request->getContent(), true);
            $user = $entityManager->getRepository(User::class)->findOneBySomeField($responseData['pseud']);
            $password = $entityManager->getRepository(User::class)->findPassword($responseData['pwd']);
            $userattr  = new User();
            $userattr->setPseudo($responseData['pseud']);
            $userattr->setPassword($responseData['pwd']);
            if (!$user && !$password) {
               
                $entityManager->persist($userattr);
                $entityManager->flush();
                return new JsonResponse(['requete' => false]);
            }
            return new JsonResponse(['requete' => true]);
            
        } catch (\Exception $e) {
         
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
