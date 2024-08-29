import React from 'react'
import { Routes, Route,Navigate } from "react-router-dom";
import HomePage from '../App/Home/HomePage';
import NewEvennt from '../App/News/New-Evennt';
import NewsDetail from '../App/News/News-detail';
import PromotionPage from '../App/Promosion/PromotionPage';
import PorductsPage from '../App/Products/PorductsPage';
import ProductDetail from '../App/Products/ProductDetail';
import ProductType from '../App/Products/ProductType';
import GiftMemory from '../App/Promosion/gift-Memory';
import PatternPages from '../App/Pattern/PatternPages';
import PriceSale from '../App/Prices/PriceSale';
import RecomendePage from '../App/Promosion/RecomendePage';
import OrdersPages from '../App/Orders/ordersPages';
import ApplyJobPage from '../App/job/apply-jobPage';
import RegisterJob from '../App/job/registerJob';
import AboutPage from '../App/About/aboutPage';
// import CheckPrice from '../App/action/check-price';
export default function AppContainer() {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/product" element={<PorductsPage />} />
            <Route path="/pos" element={<ProductType />} />
            <Route path="/news" element={<NewEvennt />} />
            <Route path="/detail" element={<NewsDetail />} />
            <Route path="/promotion" element={<PromotionPage />} />
            <Route path="/detail-ps" element={<ProductDetail />} />
            <Route path="/gift" element={<GiftMemory />} />
            <Route path="/pattern" element={<PatternPages />} />
            <Route path="/price" element={<PriceSale />} />
            <Route path='/recomend'element={<RecomendePage/>} />
            <Route path='/order'element={<OrdersPages/>} />
            <Route path='/job'element={<ApplyJobPage/>} />
            <Route path='/j'element={<RegisterJob/>} />
            <Route path='/about'element={<AboutPage/>} />
            </Routes>
  )
}
