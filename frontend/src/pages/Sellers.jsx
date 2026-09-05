import { useEffect, useState } from 'react';
import { Container, LoadingSpinner } from '../components';
import SellerCard from '../components/SellerCard';
import { useSellers } from '../hooks/useSellers';
import { Search, Loader } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

function Sellers() {
    const {
        sellers,
        loading,
        pagination,
        fetchSellers,
        loadMore,
    } = useSellers();

    const [searchTerm, setSearchTerm] = useState('');

    const { search } = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(search);

        const searchTermFromURL =
            searchParams.get('search') || '';

        setSearchTerm(searchTermFromURL);
    }, [search]);

    const handleSearch = (e) => {
        e.preventDefault();

        const trimmedSearch = searchTerm.trim();

        if (trimmedSearch) {
            navigate(`/sellers?search=${encodeURIComponent(trimmedSearch)}`);
        } else {
            navigate('/sellers');
        }
    };

    return (
        <Container className="pt-32 pb-16 min-h-[70vh]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                <div className="mb-8 md:mb-0">
                    <h1 className="text-3xl font-bold">
                        All Sellers
                    </h1>

                    <p className="text-gray-600 mt-1">
                        Discover our trusted sellers and their auctions
                    </p>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="flex gap-2 mb-8 max-w-md w-full md:w-auto"
                >
                    <div className="relative flex-1">
                        <Search
                            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                            size={20}
                        />

                        <input
                            type="text"
                            placeholder="Search sellers by name or location..."
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                    </div>

                    <button
                        type="submit"
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 whitespace-nowrap"
                    >
                        Search
                    </button>
                </form>
            </div>

            {/* Results */}
            {loading && sellers.length === 0 ? (
                <div className="flex justify-center py-12">
                    <LoadingSpinner size="large" />
                </div>
            ) : sellers.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">
                        No sellers found.
                    </p>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {sellers.map((seller) => (
                            <SellerCard
                                key={seller._id}
                                seller={seller}
                            />
                        ))}
                    </div>

                    {/* Load More */}
                    {pagination?.currentPage <
                        pagination?.totalPages && (
                            <div className="flex justify-center mt-8">
                                <button
                                    onClick={loadMore}
                                    disabled={loading}
                                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <Loader
                                            size={20}
                                            className="animate-spin"
                                        />
                                    ) : (
                                        'Load More'
                                    )}
                                </button>
                            </div>
                        )}
                </>
            )}
        </Container>
    );
}

export default Sellers;