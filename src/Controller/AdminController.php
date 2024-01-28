<?php

namespace App\Controller;

use App\Entity\Article;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class AdminController extends AbstractController
{
    #[Route('/admin', name: 'app_admin')]
    public function index(): JsonResponse
    {
        return $this->json([
            'message' => 'Welcome to your new controller!',
            'path' => 'src/Controller/AdminController.php',
        ]);
    }

    #[Route('/insert-article', name: 'app_admin')]
    public function insert(Request $request,EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $responseData = json_decode($request->getContent(), true);
            $product = $entityManager->getRepository(Article::class)->findOneBySomeField($responseData['productName']);
            $productattr = new Article();
            $productattr->setNom($responseData['productName']);
            $productattr->setType($responseData['productType']);
            $productattr->setStock($responseData['stockProduct']);
            $productattr->setPrix($responseData['prixProduct']);
            if (!$product) {
                $entityManager->persist($productattr);
                $entityManager->flush();
                return new JsonResponse(['requete' => false]);
            }
            return new JsonResponse(['requete' => true]);
            
        } catch (\Exception $e) {
         
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
// ... (previous code)

#[Route('/get-article', name: 'app_get_articles')] // Fix the route name
public function getAllProduct(ManagerRegistry $entityManager): JsonResponse
{
    try {
        // Retrieve all products
        $productRepository = $entityManager->getRepository(Article::class);
        $products = $productRepository->findAll();

        $data = [];
        foreach ($products as $row) {
            $productattr = [
                'nom' => $row->getNom(),
                'type' => $row->getType(),
                'stock' => $row->getStock(),
                'prix' => $row->getPrix(),
            ];

            $data[] = $productattr;
        }

        if (!$products) {
            return new JsonResponse(['error' => "Aucune données"]);
        }

        return new JsonResponse(['products' => $data]);

    } catch (\Exception $e) {
        return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}

}
