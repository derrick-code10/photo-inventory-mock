import React from 'react';
import { Camera } from 'lucide-react';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import type { InventoryItem } from './Dashboard';

interface InventoryGridProps {
  items: InventoryItem[];
  viewMode: 'grid' | 'list';
  onSelectItem: (item: InventoryItem) => void;
}

const statusColors = {
  available: 'bg-green-100 text-green-800 border-green-200',
  'in-use': 'bg-blue-100 text-blue-800 border-blue-200',
  archived: 'bg-gray-100 text-gray-800 border-gray-200'
};

export function InventoryGrid({ items, viewMode, onSelectItem }: InventoryGridProps) {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-12 text-center">
        <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600">No items found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your search or filters</p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="bg-white rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Item Name</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Quantity</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Tags</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Status</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Storage Location</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Last Updated</th>
              <th className="px-6 py-3 text-left text-sm text-gray-600">Updated by</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.map((item) => (
              <tr
                key={item.id}
                onClick={() => onSelectItem(item)}
                className="hover:bg-gray-50 cursor-pointer transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center flex-shrink-0">
                      <Camera className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>{item.itemName}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.quantity}</td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {item.tags.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{item.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="outline" className={statusColors[item.status]}>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-gray-600">{item.storageLocation}</td>
                <td className="px-6 py-4 text-gray-600">{item.lastUpdated}</td>
                <td className="px-6 py-4 text-gray-600">{item.updatedBy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <Card
          key={item.id}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectItem(item)}
        >
          <CardHeader className="pb-4">
            <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center mb-4">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
            <div className="flex items-start justify-between gap-2">
              <CardTitle className="line-clamp-2">{item.itemName}</CardTitle>
              <Badge variant="outline" className={statusColors[item.status]}>
                {item.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity:</span>
                <span>{item.quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Storage:</span>
                <span className="truncate ml-2">{item.storageLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated:</span>
                <span>{item.lastUpdated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Updated by:</span>
                <span className="truncate ml-2">{item.updatedBy}</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
