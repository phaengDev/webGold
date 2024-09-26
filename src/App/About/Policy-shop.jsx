import React, { useState, useEffect } from 'react'
import PageHeader from '../../Layout/page-header';
import { Config } from '../../config/connection';
function PolicyShop() {
    const api = Config.urlApi;
    const [itemPolicy, setItemPolicy] = useState([]);
    const fetchPolicy = async () => {
        try {
            const response = await fetch(api + 'policy/');
            const jsonData = await response.json();
            setItemPolicy(jsonData);
            console.log(jsonData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchPolicy()
    }, [])

    return (
        <>
            <PageHeader text={'ນະໂຍບາຍຂອງ ຮ້ານຄຳ ນາງວຽງຄຳ'} />

            <div id="faq" class="section-container pt-2">
                <div class="container">
                    <ul class="breadcrumb mb-10px fs-14px">
                        <li class="breadcrumb-item"><a href="#">ໜ້າຫຼັກ</a></li>
                        <li class="breadcrumb-item active">ນະໂຍບາຍ ຂອງຮ້ານຄຳ ນາງວຽງຄຳ</li>
                    </ul>


                    <div class="accordion faq" id="faq-list">
                        {itemPolicy.map((item, index) => (
                            <div class="accordion-item  border-0">
                                <div class="accordion-header text-white">
                                    <a href="#" class="accordion-button bg-viengkham text-white fw-bold shadow-none fs-15px" id={`faq-${item.policy_id}-heading`} data-bs-toggle="collapse" data-bs-target={`#faq-${item.policy_id}`}>
                                        <span class="me-3">{index + 1}</span> {item.policy_name}
                                    </a>
                                </div>
                                <div id={`faq-${item.policy_id}`} class="collapse show" data-bs-parent="#faq-list">
                                    <div class="accordion-body bg-component">
                                        <div dangerouslySetInnerHTML={{ __html: item.policy_detail }} />
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>

        </>
    )
}

export default PolicyShop