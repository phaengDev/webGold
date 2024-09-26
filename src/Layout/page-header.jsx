import React from 'react'

function PageHeader({text}) {
  return (
    <div id="page-header" class="section-container page-header-container bg-dark">
    <div class="page-header-cover">
        <img src="./assets/img/logo/cover-gof.jpg" alt />
    </div>
    <div class="container">
        <h1 class="page-header">{text}</h1>
    </div>
</div>
    
  )
}

export default PageHeader