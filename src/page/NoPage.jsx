import Footer from "../component/public/Footer";
import HeaderPuclic from "../component/public/HeaderPuclic"

const NoPage = () =>{

    return (
        <>
            <HeaderPuclic/>
            <main className="App-main">
                <div className="App-container">
                    <h2>Erreur de chargement</h2>
                    <p>La Page que vous voulez atteindre n'existe pas.</p>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default NoPage;