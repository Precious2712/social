export function InfoItem({ label, value }: { label: string; value?: string | number }) {
    return (
        <div>
            <h3 className="text-sm font-medium text-gray-500">{label}</h3>
            <p className="text-gray-900">{value || 'Not specified'}</p>
        </div>
    );
}