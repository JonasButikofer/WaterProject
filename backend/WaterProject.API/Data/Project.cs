﻿using System.ComponentModel.DataAnnotations;

public class Project
{
    [Key]
    public int ProjectId { get; set; }

    [Required]
    public required string ProjectName { get; set; } = string.Empty;

    public string? ProjectType { get; set; }
    public string? ProjectRegionalProgram { get; set; }
    public int? ProjectImpact { get; set; }
    public string? ProjectPhase { get; set; }
    public string? ProjectFunctionalityStatus { get; set; }
}

