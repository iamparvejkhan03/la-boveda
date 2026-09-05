import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-hot-toast';

export const useSellers = (initialFilters = {}) => {
    const location = useLocation();

    const [sellers, setSellers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState(null);

    const [filters, setFilters] = useState({
        search: '',
        location: '',
        page: 1,
        limit: 12,
        ...initialFilters,
    });

    const fetchSellers = async (newFilters = {}) => {
        const mergedFilters = {
            ...filters,
            ...newFilters,
        };

        setFilters(mergedFilters);
        setLoading(true);

        try {
            const params = new URLSearchParams();

            Object.entries(mergedFilters).forEach(([key, value]) => {
                if (
                    value !== '' &&
                    value !== null &&
                    value !== undefined
                ) {
                    params.append(key, value);
                }
            });

            const { data } = await axiosInstance.get(
                `/api/v1/users/sellers?${params.toString()}`
            );

            if (data.success) {
                if (mergedFilters.page > 1) {
                    setSellers((prev) => [
                        ...prev,
                        ...data.data.sellers,
                    ]);
                } else {
                    setSellers(data.data.sellers);
                }

                setPagination(data.data.pagination);
            }
        } catch (error) {
            console.error('Failed to load sellers:', error);
            toast.error('Failed to load sellers');
        } finally {
            setLoading(false);
        }
    };

    const loadMore = () => {
        if (
            pagination?.currentPage &&
            pagination?.totalPages &&
            pagination.currentPage < pagination.totalPages
        ) {
            fetchSellers({
                page: pagination.currentPage + 1,
            });
        }
    };

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);

        const searchFromURL = searchParams.get('search') || '';

        fetchSellers({
            search: searchFromURL,
            page: 1,
        });
    }, [location.search]);

    return {
        sellers,
        loading,
        pagination,
        filters,
        fetchSellers,
        loadMore,
    };
};