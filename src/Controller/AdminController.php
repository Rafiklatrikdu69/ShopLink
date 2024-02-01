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
    
    #[Route('/insert-article', name: 'insert-article')]
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
    
    
    #[Route('/del-article', name: 'del-article')] 
    public function deleteSuppr(Request $request,EntityManagerInterface $entityManager): JsonResponse
    {
        try {
            $responseData = json_decode($request->getContent(), true);
           
            
            
            $data = [];
           
            foreach ($responseData as $row) {
                $entityManager->createQueryBuilder()
                ->delete(Article::class, 'a')
                ->where('a.id = :id')
                ->setParameter('id', $row['id'])
                ->getQuery()
                ->execute();
                
               
            }

            
            
            
            
            return new JsonResponse(['products' => $data]);
            
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    #[Route('/get-article', name: 'app_get_articles')] // Fix the route name
    public function getAllProducts(ManagerRegistry $entityManager): JsonResponse
    {
        try {
            
            $productRepository = $entityManager->getRepository(Article::class);
            $products = $productRepository->findAll();
            
            $data = [];
            if (!$products) {
                return new JsonResponse(['data' => null]);
            }
            foreach ($products as $row) {
                $productattr = [
                    'id'=>$row->getId(),
                    'nom' => $row->getNom(),
                    'type' => $row->getType(),
                    'stock' => $row->getStock(),
                    'prix' => $row->getPrix(),
                ];
                
                $data[] = $productattr;
            }
            return new JsonResponse(['products' => $data]);
            
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/get-last-id', name: 'app_id')] // Fix the route name
    public function getLastId(EntityManagerInterface $entityManager): JsonResponse
    {
        try {
         
            $data = $entityManager->createQueryBuilder()
            ->select('a') 
            ->from(Article::class, 'a')
            ->orderBy('a.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();

            if(!$data){
                return new JsonResponse(['data' => null]);
            }
            $productattr = [
                'id'=>$data->getId(),
            ];
            
            $donnes[] = $productattr;
            if($data){
                return new JsonResponse(['data' => $donnes]);
            }
           
        
       
                   
            
        } catch (\Exception $e) {
            return new JsonResponse(['error' => $e->getMessage()], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
    
}
