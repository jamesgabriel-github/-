import Navbar from '@/components/Navbar';
import Footer from '@/components/footer';

const MainLayout = ({children}) => {
    return(
        <div>
            <div>
                <Navbar />
            </div>

            <div>
                {children}
            </div>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default MainLayout;