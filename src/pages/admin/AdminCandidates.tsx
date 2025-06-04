
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2 } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useToast } from '@/components/ui/use-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';

// Dummy candidate data
const initialCandidates = [
  {
    id: '1',
    name: 'David Johnson',
    title: 'Senior Frontend Developer',
    email: 'david.j@example.com',
    experience: '8 years',
    location: 'London, UK',
    skills: ['React', 'TypeScript', 'Node.js'],
    status: 'active',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    title: 'UX/UI Designer',
    email: 'maria.g@example.com',
    experience: '5 years',
    location: 'Madrid, Spain',
    skills: ['Figma', 'Adobe XD', 'User Research'],
    status: 'active',
  },
  {
    id: '3',
    name: 'Alex Kim',
    title: 'DevOps Engineer',
    email: 'alex.k@example.com',
    experience: '6 years',
    location: 'Berlin, Germany',
    skills: ['Docker', 'Kubernetes', 'AWS'],
    status: 'inactive',
  },
];

const AdminCandidates = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [candidates, setCandidates] = useState(initialCandidates);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentCandidate, setCurrentCandidate] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
    experience: '',
    location: '',
    skills: '',
    status: 'active',
  });

  const filteredCandidates = candidates.filter(candidate =>
    candidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    candidate.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCandidate = () => {
    const newCandidate = {
      id: Date.now().toString(),
      name: formData.name,
      title: formData.title,
      email: formData.email,
      experience: formData.experience,
      location: formData.location,
      skills: formData.skills.split(',').map(skill => skill.trim()),
      status: formData.status,
    };
    
    setCandidates([...candidates, newCandidate]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: 'Candidate Added',
      description: `${newCandidate.name} has been added to the system.`,
    });
  };

  const handleEditCandidate = () => {
    if (!currentCandidate) return;
    
    const updatedCandidates = candidates.map(candidate => {
      if (candidate.id === currentCandidate.id) {
        return {
          ...candidate,
          name: formData.name,
          title: formData.title,
          email: formData.email,
          experience: formData.experience,
          location: formData.location,
          skills: formData.skills.split(',').map(skill => skill.trim()),
          status: formData.status,
        };
      }
      return candidate;
    });
    
    setCandidates(updatedCandidates);
    setIsEditDialogOpen(false);
    resetForm();
    
    toast({
      title: 'Candidate Updated',
      description: `${formData.name}'s information has been updated.`,
    });
  };

  const handleDeleteCandidate = () => {
    if (!currentCandidate) return;
    
    const updatedCandidates = candidates.filter(
      candidate => candidate.id !== currentCandidate.id
    );
    
    setCandidates(updatedCandidates);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: 'Candidate Removed',
      description: `${currentCandidate.name} has been removed from the system.`,
    });
  };

  const prepareEditDialog = (candidate: any) => {
    setCurrentCandidate(candidate);
    setFormData({
      name: candidate.name,
      title: candidate.title,
      email: candidate.email,
      experience: candidate.experience,
      location: candidate.location,
      skills: candidate.skills.join(', '),
      status: candidate.status,
    });
    setIsEditDialogOpen(true);
  };

  const prepareDeleteDialog = (candidate: any) => {
    setCurrentCandidate(candidate);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      email: '',
      experience: '',
      location: '',
      skills: '',
      status: 'active',
    });
    setCurrentCandidate(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Candidates</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Candidate
        </Button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search candidates..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden md:table-cell">Experience</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCandidates.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No candidates found
                </TableCell>
              </TableRow>
            ) : (
              filteredCandidates.map((candidate) => (
                <TableRow key={candidate.id}>
                  <TableCell className="font-medium">{candidate.name}</TableCell>
                  <TableCell>{candidate.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{candidate.email}</TableCell>
                  <TableCell className="hidden md:table-cell">{candidate.experience}</TableCell>
                  <TableCell className="hidden md:table-cell">{candidate.location}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      candidate.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {candidate.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => prepareEditDialog(candidate)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => prepareDeleteDialog(candidate)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Add Candidate Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Candidate</DialogTitle>
            <DialogDescription>
              Enter the details for the new candidate
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
                placeholder="email@example.com"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="experience">Experience</Label>
                <Input 
                  id="experience" 
                  name="experience" 
                  value={formData.experience}
                  onChange={handleInputChange}
                  placeholder="e.g. 5 years"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input 
                  id="location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="City, Country"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="skills">Skills (comma separated)</Label>
              <Textarea 
                id="skills" 
                name="skills" 
                value={formData.skills}
                onChange={handleInputChange}
                placeholder="e.g. React, TypeScript, Node.js"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <select 
                id="status" 
                name="status" 
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCandidate}>Add Candidate</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Candidate Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Candidate</DialogTitle>
            <DialogDescription>
              Update the candidate's information
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input 
                id="edit-name" 
                name="name" 
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Professional Title</Label>
              <Input 
                id="edit-title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input 
                id="edit-email" 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-experience">Experience</Label>
                <Input 
                  id="edit-experience" 
                  name="experience" 
                  value={formData.experience}
                  onChange={handleInputChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-location">Location</Label>
                <Input 
                  id="edit-location" 
                  name="location" 
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-skills">Skills (comma separated)</Label>
              <Textarea 
                id="edit-skills" 
                name="skills" 
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <select 
                id="edit-status" 
                name="status" 
                value={formData.status}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditCandidate}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this candidate? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentCandidate && (
            <div className="py-4">
              <p><strong>Name:</strong> {currentCandidate.name}</p>
              <p><strong>Email:</strong> {currentCandidate.email}</p>
            </div>
          )}
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteCandidate}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminCandidates;
