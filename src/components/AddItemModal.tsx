import React, { useState } from 'react';
import { X, Upload, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import type { InventoryItem } from './Dashboard';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: InventoryItem) => void;
}

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 1,
    status: 'available' as 'available' | 'in-use' | 'archived',
    storageLocation: '',
    updatedBy: ''
  });
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newItem: InventoryItem = {
      id: Date.now().toString(),
      itemName: formData.itemName,
      quantity: formData.quantity,
      tags,
      status: formData.status,
      storageLocation: formData.storageLocation,
      lastUpdated: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
      updatedBy: formData.updatedBy
    };

    onAdd(newItem);
    
    // Reset form
    setFormData({
      itemName: '',
      quantity: 1,
      status: 'available',
      storageLocation: '',
      updatedBy: ''
    });
    setTags([]);
    setTagInput('');
    onClose();
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2>Add New Item</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <Label>Image</Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, RAW up to 50MB</p>
            </div>
          </div>

          {/* Item Name */}
          <div>
            <Label htmlFor="itemName">Item Name *</Label>
            <Input
              id="itemName"
              type="text"
              placeholder="e.g., Landscape Series - Mountain Vista"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              required
              className="mt-2"
            />
          </div>

          {/* Quantity and Status Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="quantity">Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="status">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: any) => setFormData({ ...formData, status: value })}
                required
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="in-use">In Use</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Storage Location and Updated By Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="storageLocation">Storage Location *</Label>
              <Input
                id="storageLocation"
                type="text"
                placeholder="e.g., Studio A, Cabinet 3, Shelf B"
                value={formData.storageLocation}
                onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                required
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="updatedBy">Updated By *</Label>
              <Input
                id="updatedBy"
                type="text"
                placeholder="e.g., John Doe, Prof. Smith"
                value={formData.updatedBy}
                onChange={(e) => setFormData({ ...formData, updatedBy: e.target.value })}
                required
                className="mt-2"
              />
            </div>
          </div>

          {/* Tags */}
          <div>
            <Label htmlFor="tags">Tags</Label>
            <div className="mt-2 space-y-2">
              <div className="flex gap-2">
                <Input
                  id="tags"
                  type="text"
                  placeholder="Add a tag and press Enter"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button type="button" variant="outline" onClick={handleAddTag}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-lg border">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1">
                      {tag}
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:text-red-600"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
