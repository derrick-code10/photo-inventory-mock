import { X, Camera, MapPin, Calendar, Settings, Tag, FileText, Edit, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import type { InventoryItem } from './Dashboard';

interface InventoryDetailsProps {
  item: InventoryItem;
  onClose: () => void;
}

const statusColors = {
  available: 'bg-green-100 text-green-800 border-green-200',
  'in-use': 'bg-blue-100 text-blue-800 border-blue-200',
  archived: 'bg-gray-100 text-gray-800 border-gray-200'
};

export function InventoryDetails({ item, onClose }: InventoryDetailsProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2>Item Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Image Placeholder */}
          <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
            <Camera className="w-16 h-16 text-gray-400" />
          </div>

          {/* Title and Status */}
          <div>
            <div className="flex items-start justify-between gap-4 mb-2">
              <h3>{item.title}</h3>
              <Badge variant="outline" className={statusColors[item.status]}>
                {item.status}
              </Badge>
            </div>
            <p className="text-gray-600">{item.category}</p>
          </div>

          <Separator />

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span>Date Captured</span>
                </div>
                <p>{item.date}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Location</span>
                </div>
                <p>{item.location}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Settings className="w-4 h-4" />
                  <span>Equipment Used</span>
                </div>
                <p>{item.equipment}</p>
              </div>

              <div>
                <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                  <Tag className="w-4 h-4" />
                  <span>Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Notes */}
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <FileText className="w-4 h-4" />
              <span>Notes</span>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border">
              <p className="text-gray-700">{item.notes}</p>
            </div>
          </div>

          <Separator />

          {/* Metadata */}
          <div className="bg-gray-50 rounded-lg p-4 border">
            <h4 className="text-sm mb-3">Additional Metadata</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Item ID:</span>
                <p className="mt-1">{item.id}</p>
              </div>
              <div>
                <span className="text-gray-600">Format:</span>
                <p className="mt-1">RAW + JPEG</p>
              </div>
              <div>
                <span className="text-gray-600">File Size:</span>
                <p className="mt-1">45.2 MB</p>
              </div>
              <div>
                <span className="text-gray-600">Resolution:</span>
                <p className="mt-1">6000 × 4000 px</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button className="flex-1">
              <Edit className="w-4 h-4 mr-2" />
              Edit Item
            </Button>
            <Button variant="outline" className="flex-1">
              Change Status
            </Button>
            <Button variant="outline" size="icon">
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
