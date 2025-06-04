
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Edit, Trash2, ExternalLink } from 'lucide-react';
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
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Dummy job data
const initialJobs = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    company: 'Seven Technologies',
    location: 'London, UK (Remote)',
    type: 'Full-time',
    salary: '$120,000 - $150,000',
    status: 'active',
    applicants: 24,
    posted: '2023-04-15',
  },
  {
    id: '2',
    title: 'UX/UI Designer',
    company: 'Digital Minds Inc.',
    location: 'Berlin, Germany',
    type: 'Full-time',
    salary: '€70,000 - €85,000',
    status: 'active',
    applicants: 18,
    posted: '2023-04-10',
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    company: 'Cloud Systems Ltd',
    location: 'Remote',
    type: 'Contract',
    salary: '$100 - $120 per hour',
    status: 'closed',
    applicants: 32,
    posted: '2023-03-22',
  },
];

const AdminJobs = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [jobs, setJobs] = useState(initialJobs);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    status: 'active',
    description: '',
  });

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddJob = () => {
    const newJob = {
      id: Date.now().toString(),
      title: formData.title,
      company: formData.company,
      location: formData.location,
      type: formData.type,
      salary: formData.salary,
      status: formData.status,
      description: formData.description,
      applicants: 0,
      posted: new Date().toISOString().split('T')[0],
    };
    
    setJobs([...jobs, newJob]);
    setIsAddDialogOpen(false);
    resetForm();
    
    toast({
      title: 'Job Added',
      description: `${newJob.title} at ${newJob.company} has been added.`,
    });
  };

  const handleEditJob = () => {
    if (!currentJob) return;
    
    const updatedJobs = jobs.map(job => {
      if (job.id === currentJob.id) {
        return {
          ...job,
          title: formData.title,
          company: formData.company,
          location: formData.location,
          type: formData.type,
          salary: formData.salary,
          status: formData.status,
          description: formData.description,
        };
      }
      return job;
    });
    
    setJobs(updatedJobs);
    setIsEditDialogOpen(false);
    resetForm();
    
    toast({
      title: 'Job Updated',
      description: `${formData.title} has been updated.`,
    });
  };

  const handleDeleteJob = () => {
    if (!currentJob) return;
    
    const updatedJobs = jobs.filter(
      job => job.id !== currentJob.id
    );
    
    setJobs(updatedJobs);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: 'Job Removed',
      description: `${currentJob.title} has been removed from the system.`,
    });
  };

  const prepareEditDialog = (job: any) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      type: job.type,
      salary: job.salary,
      status: job.status,
      description: job.description || '',
    });
    setIsEditDialogOpen(true);
  };

  const prepareDeleteDialog = (job: any) => {
    setCurrentJob(job);
    setIsDeleteDialogOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      company: '',
      location: '',
      type: 'Full-time',
      salary: '',
      status: 'active',
      description: '',
    });
    setCurrentJob(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Manage Jobs</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Job
        </Button>
      </div>
      
      <div className="flex items-center mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search jobs..."
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
              <TableHead>Title</TableHead>
              <TableHead>Company</TableHead>
              <TableHead className="hidden md:table-cell">Location</TableHead>
              <TableHead className="hidden md:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Applicants</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No jobs found
                </TableCell>
              </TableRow>
            ) : (
              filteredJobs.map((job) => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.company}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.location}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.type}</TableCell>
                  <TableCell className="hidden md:table-cell">{job.applicants}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      job.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {job.status}
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
                        <DropdownMenuItem onClick={() => prepareEditDialog(job)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => prepareDeleteDialog(job)}>
                          <Trash2 className="mr-2 h-4 w-4" /> Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <ExternalLink className="mr-2 h-4 w-4" /> View Job
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
      
      {/* Add Job Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Job</DialogTitle>
            <DialogDescription>
              Create a new job listing
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Job Title</Label>
              <Input 
                id="title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g. Senior Frontend Developer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="company">Company</Label>
              <Input 
                id="company" 
                name="company" 
                value={formData.company}
                onChange={handleInputChange}
                placeholder="e.g. Seven Technologies"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                value={formData.location}
                onChange={handleInputChange}
                placeholder="e.g. London, UK (Remote)"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="type">Job Type</Label>
              <select 
                id="type" 
                name="type" 
                value={formData.type}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="salary">Salary Range</Label>
              <Input 
                id="salary" 
                name="salary" 
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="e.g. $120,000 - $150,000"
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
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Job Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Enter detailed job description..."
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddJob}>Add Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Edit Job Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Job</DialogTitle>
            <DialogDescription>
              Update this job listing
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Job Title</Label>
              <Input 
                id="edit-title" 
                name="title" 
                value={formData.title}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-company">Company</Label>
              <Input 
                id="edit-company" 
                name="company" 
                value={formData.company}
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
            <div className="grid gap-2">
              <Label htmlFor="edit-type">Job Type</Label>
              <select 
                id="edit-type" 
                name="type" 
                value={formData.type}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-salary">Salary Range</Label>
              <Input 
                id="edit-salary" 
                name="salary" 
                value={formData.salary}
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
                <option value="closed">Closed</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Job Description</Label>
              <Textarea 
                id="edit-description" 
                name="description" 
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditJob}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this job? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {currentJob && (
            <div className="py-4">
              <p><strong>Job Title:</strong> {currentJob.title}</p>
              <p><strong>Company:</strong> {currentJob.company}</p>
            </div>
          )}
          <DialogFooter className="sm:justify-end">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteJob}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminJobs;
